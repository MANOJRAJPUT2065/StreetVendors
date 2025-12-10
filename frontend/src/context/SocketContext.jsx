import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const url = process.env.REACT_APP_SOCKET_URL || process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

      const newSocket = io(url, {
        transports: ['websocket', 'polling'],
        auth: {
          token: localStorage.getItem('token'),
        },
      });

      newSocket.on('connect', () => {
        console.log('Socket connected');
      });

      newSocket.on('notification', (notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });

      newSocket.on('orderUpdate', (order) => {
        setNotifications((prev) => [
          { type: 'order', message: `Order ${order._id} status: ${order.status}`, data: order },
          ...prev,
        ]);
      });

      newSocket.on('connect_error', (err) => {
        console.error('Socket connect_error', err.message);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const value = {
    socket,
    notifications,
    clearNotifications: () => setNotifications([]),
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketContext;
