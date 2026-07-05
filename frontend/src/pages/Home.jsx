import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../redux/slices/orderSlice';
import ActionButton from '../components/ActionButton';
import OrderTable from '../components/OrderTable';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector((state) => state.orders.list);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleEditOrder = (order) => {
        navigate('/order/new', { state: { editOrder: order } });
    };

    return (
        <div className="p-6 bg-secondary min-h-screen">
            <div className="max-w-7xl mx-auto bg-white border border-gray-400 rounded shadow">
                <div className="border-b border-gray-400 p-2 bg-gray-200">
                    <h2 className="text-center font-bold text-gray-800">Home</h2>
                </div>
                
                <div className="p-4 border-b border-gray-400">
                    <ActionButton onClick={() => navigate('/order/new')} label="Add New" />
                </div>
                
                <div className="p-4">
                    <OrderTable orders={orders} onRowDoubleClick={handleEditOrder} />
                </div>
            </div>
        </div>
    );
};

export default Home;
