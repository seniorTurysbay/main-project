import React, {useState} from "react";
import {useHttp} from "../hooks/http.hook";

export const AuthPage = () => {
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    //Handler изменяющиеся параметры, Обрабатывает
    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form})
            console.log(`data ${data}`)
        } catch (e) {
        }
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h4>Личный кабинет</h4>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="row" style={{marginTop: "50px"}}>
                                <div className="input-field">
                                    <input
                                        id="email" type="text" className="yellow-input" name="email"
                                        onChange={changeHandler}/>
                                    <label htmlFor="email">E-mail</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        id="password" type="text" className="yellow-input" type="password"
                                        name="password"
                                        onChange={changeHandler}/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className={"btn yellow darken-4 waves-effect waves-light"}
                                disabled={loading}
                        >Login
                        </button>
                        <button className={"btn grey lighten-1 black-text waves-effect waves-light"}
                                onClick={registerHandler}
                                disabled={loading}
                        >Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}