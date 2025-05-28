import {useState} from  'react';

export const useAuth = () =>{
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null)


    const login = async() =>{
        setLoading(true)
        setError(null)


        try {
            const response = await loginEmployee();
            if(response && response.token){
                const userData = {
                    ... response.user,
                    token: response.token
                };
                localStorage.setItem('token',response.token)
                localStorage.setItem('customer', JSON.stringify(userData));
                console.log('Stored user data:', userData);
                setLoading(false);
                return {
                  success:true,
                  user: response.user
                       }
            }
            throw new Error('Login failed');
        } catch (error) {
            setError('Invalid credentials');
            setLoading(false);
            throw error;
            
        }
    }


    return{
    login
         }
}
