import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiClient } from '../services/api'; // 'apiClient' süslü parantez OLMADAN import edilir çünkü 'export const' ile ihraç edildi.

// 1. Context'i oluşturuyoruz. Dışarıdan erişilebilir olması için export ediyoruz.
export const AuthContext = createContext(null);

// 2. Bu context'i bileşenler içinde kolayca kullanmak için bir "custom hook" oluşturuyoruz.
// Bu hook'u çağıran herhangi bir bileşen, 'value' içindeki her şeye erişebilir.
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Tüm uygulamayı saracak ve context değerlerini sağlayacak olan ana bileşen.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Giriş yapmış kullanıcı bilgisi (şimdilik basit bir nesne)
  const [token, setToken] = useState(null); // JWT token'ı
  const [loading, setLoading] = useState(true); // Uygulama ilk açılırken token'ı kontrol etme süreci için

  useEffect(() => {
    // Bu useEffect, uygulama ilk yüklendiğinde SADECE BİR KEZ çalışır.
    // Tarayıcının hafızasındaki (localStorage) eski token'ı kontrol eder.
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      // Eğer hafızada bir token varsa, kullanıcının hala giriş yapmış olduğunu varsayalım.
      setToken(storedToken);
      // axios'un bundan sonraki TÜM isteklerde bu token'ı otomatik olarak kullanmasını sağlıyoruz.
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      // Kullanıcı durumunu "giriş yapıldı" olarak ayarlıyoruz.
      setUser({ isAuthenticated: true });
    }
    // Token kontrolü bitti, artık ana uygulamayı gösterebiliriz.
    setLoading(false);
  }, []);

  const login = (newToken) => {
    // Giriş başarılı olduğunda bu fonksiyon çağrılır.
    localStorage.setItem('token', newToken); // Token'ı tarayıcı hafızasına kaydet.
    setToken(newToken);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setUser({ isAuthenticated: true });
  };

  const logout = () => {
    // Çıkış yapıldığında bu fonksiyon çağrılır.
    localStorage.removeItem('token'); // Token'ı hafızadan sil.
    setToken(null);
    delete apiClient.defaults.headers.common['Authorization']; // axios'tan token'ı kaldır.
    setUser(null);
  };

  // Provider aracılığıyla tüm alt bileşenlerin erişebileceği değerleri bir araya getiriyoruz.
  const value = {
    user,
    token,
    isAuthenticated: !!token, // token varsa true, yoksa false döner.
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* 'loading' durumu true iken hiçbir şey göstermiyoruz.
          Bu, token kontrolü bitmeden uygulamanın render edilmesini engeller. */}
      {!loading && children}
    </AuthContext.Provider>
  );
};