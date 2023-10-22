import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, emailupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj={ email, password };

            fetch("http://158.160.68.168:80/users/authenticate",{
                method: "POST",
                headers:{'content-type':'application/json'},
                body: JSON.stringify(inputobj)
            }).then((res) => {
                console.log(res);
                if (!res.ok) {
                    toast.error("Error");
                }
                else{
                    toast.success('Success');
                    sessionStorage.setItem('email',email);
                    sessionStorage.setItem('token',res.token);
                    window.location.href = 'http://158.160.68.168:8089/';
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            let inputobj={ email, password };
            fetch("http://158.160.68.168:80/users/authenticate",{
                method: "POST",
                headers:{'content-type':'application/json'},
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Login failed, invalid credentials');
                }else{
                     toast.success('Success');
                     sessionStorage.setItem('email',email);
                     sessionStorage.setItem('token',resp.token);
                    console.log('1');
                     window.location.href = 'http://158.160.68.168:8089/';
                }
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid email');
                } else {
                     if (resp.password === password) {
                         toast.success('Success');
                         sessionStorage.setItem('email',email);
                         console.log('1');
                         window.location.href = 'http://158.160.68.168:8089/';
                     }else{
                         toast.error('Please Enter valid credentials');
                     }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Email<span className="errmsg">*</span></label>
                                <input value={email} onChange={e => emailupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> |
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;