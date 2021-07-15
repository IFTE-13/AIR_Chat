import React, { useRef, useEffect, useState } from 'react';
import { auth } from '../components/firebase';
import { ChatEngine } from 'react-chat-engine';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

const Chats = () => {

    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!user) {
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/user/me', {
            header: {
                "project-id": "3b0b7609-1898-41d6-be29-95420b96ff05",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
            .then(() => {
                LoadingOutlined(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);
                        axios.post('https://api.chatengine.io/users/', formdata, {
                            headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }
                        })
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error))
                    })
            })
    }, [user, history])

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    AirChat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    LogOut
                </div>
            </div>
            <ChatEngine
                height="calc(100vh-66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;