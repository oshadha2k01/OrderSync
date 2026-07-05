import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchClients, fetchItems } from '../redux/slices/masterDataSlice';
import { saveOrder } from '../redux/slices/orderSlice';
import FormInput from '../components/FormInput';
import ActionButton from '../components/ActionButton';
import { formatCurrency } from '../utils/formatters';

const emptyLine = { itemCode: '', description: '', note: '', quantity: 1, price: 0, taxRate: 0, exclAmount: 0, taxAmount: 0, inclAmount: 0 };

const SalesOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const { clients, items } = useSelector((state) => state.masterData);

    const [header, setHeader] = useState({
        customerName: '', clientId: '', address1: '', address2: '', address3: '', 
        suburb: '', state: '', postCode: '',
        invoiceNo: '', invoiceDate: '', referenceNo: '', note: ''
    });

    const [lines, setLines] = useState([emptyLine]);

    useEffect(() => {
        dispatch(fetchClients());
        dispatch(fetchItems());
        
        if (location.state?.editOrder) {
            const order = location.state.editOrder;
            setHeader({...order, invoiceDate: order.invoiceDate.split('T')[0]});
            setLines(order.items.length > 0 ? order.items : [emptyLine]);
        }
    }, [dispatch, location]);

    const handleCustomerChange = (e) => {
        const client = clients.find(c => c.customerName === e.target.value);
        if (client) {
            setHeader({
                ...header, customerName: client.customerName, clientId: client.id,
                address1: client.address1 || '', address2: client.address2 || '',
                address3: client.address3 || '', suburb: client.suburb || '',
                state: client.state || '', postCode: client.postCode || ''
            });
        } else {
            setHeader({ ...header, customerName: e.target.value, clientId: '' });
        }
    };

    const handleLineChange = (index, field, value) => {
        const newLines = [...lines];
        let line = { ...newLines[index] };
        line[field] = value;

        if (field === 'itemCode' || field === 'description') {
            const item = items.find(i => i.itemCode === value || i.description === value);
            if (item) {
                line.itemCode = item.itemCode;
                line.description = item.description;
                line.price = item.defaultPrice;
            }
        }

        line.exclAmount = (parseFloat(line.quantity) || 0) * (parseFloat(line.price) || 0);
        line.taxAmount = line.exclAmount * ((parseFloat(line.taxRate) || 0) / 100);
        line.inclAmount = line.exclAmount + line.taxAmount;

        newLines[index] = line;
        setLines(newLines);
        
        if (index === lines.length - 1 && line.itemCode !== '') {
            setLines([...newLines, emptyLine]);
        }
    };

    const totals = lines.reduce((acc, curr) => ({
        totalExcl: acc.totalExcl + curr.exclAmount,
        totalTax: acc.totalTax + curr.taxAmount,
        totalIncl: acc.totalIncl + curr.inclAmount
    }), { totalExcl: 0, totalTax: 0, totalIncl: 0 });

    const handleSave = async () => {
        const orderData = { 
            ...header, 
            ...totals, 
            items: lines.filter(l => l.itemCode !== '') 
        };
        await dispatch(saveOrder(orderData));
        navigate('/'); 
    };

    return (
        <div className="p-4 md:p-6 bg-secondary min-h-screen">
            <div className="max-w-6xl mx-auto bg-white border border-gray-400 rounded shadow">
                
                <div className="border-b border-gray-400 p-2 bg-gray-200">
                    <h2 className="text-center font-bold text-gray-800">Sales Order</h2>
                </div>
                
                <div className="p-4 border-b border-gray-400">
                    <ActionButton onClick={handleSave} label="Save Order" icon="✔" />
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-400">
                    <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <label className="w-full sm:w-32 text-sm font-semibold text-gray-700">Customer Name</label>
                            <select 
                                className="border border-gray-400 flex-1 p-1 rounded text-sm" 
                                value={header.customerName} 
                                onChange={handleCustomerChange}
                            >
                                <option value="">Select...</option>
                                {clients.map(c => <option key={c.id} value={c.customerName}>{c.customerName}</option>)}
                            </select>
                        </div>
                        <FormInput label="Address 1" value={header.address1} onChange={e => setHeader({...header, address1: e.target.value})} />
                        <FormInput label="Address 2" value={header.address2} onChange={e => setHeader({...header, address2: e.target.value})} />
                        <FormInput label="Address 3" value={header.address3} onChange={e => setHeader({...header, address3: e.target.value})} />
                        <FormInput label="Suburb" value={header.suburb} onChange={e => setHeader({...header, suburb: e.target.value})} />
                        <FormInput label="State" value={header.state} onChange={e => setHeader({...header, state: e.target.value})} />
                        <FormInput label="Post Code" value={header.postCode} onChange={e => setHeader({...header, postCode: e.target.value})} />
                    </div>
                    
                    <div className="space-y-1">
                        <FormInput label="Invoice No." value={header.invoiceNo} onChange={e => setHeader({...header, invoiceNo: e.target.value})} />
                        <FormInput label="Invoice Date" type="date" value={header.invoiceDate} onChange={e => setHeader({...header, invoiceDate: e.target.value})} />
                        <FormInput label="Reference no" value={header.referenceNo} onChange={e => setHeader({...header, referenceNo: e.target.value})} />
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            <label className="w-full sm:w-32 text-sm font-semibold text-gray-700">Note</label>
                            <textarea className="border border-gray-400 flex-1 p-1 rounded h-24 text-sm" value={header.note} onChange={e => setHeader({...header, note: e.target.value})} />
                        </div>
                    </div>
                </div>

                <div className="p-4 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-400 min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-300 text-sm">
                                <th className="border border-gray-400 p-2 w-32 text-left">Item Code</th>
                                <th className="border border-gray-400 p-2 text-left">Description</th>
                                <th className="border border-gray-400 p-2 w-32 text-left">Note</th>
                                <th className="border border-gray-400 p-2 w-20 text-right">Quantity</th>
                                <th className="border border-gray-400 p-2 w-24 text-right">Price</th>
                                <th className="border border-gray-400 p-2 w-20 text-right">Tax (%)</th>
                                <th className="border border-gray-400 p-2 w-24 text-right">Excl Amt</th>
                                <th className="border border-gray-400 p-2 w-24 text-right">Tax Amt</th>
                                <th className="border border-gray-400 p-2 w-24 text-right">Incl Amt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lines.map((line, index) => (
                                <tr key={index} className="text-sm">
                                    <td className="border border-gray-400 p-1">
                                        <select className="w-full outline-none bg-transparent" value={line.itemCode} onChange={e => handleLineChange(index, 'itemCode', e.target.value)}>
                                            <option value=""></option>
                                            {items.map(i => <option key={i.id} value={i.itemCode}>{i.itemCode}</option>)}
                                        </select>
                                    </td>
                                    <td className="border border-gray-400 p-1">
                                        <select className="w-full outline-none bg-transparent" value={line.description} onChange={e => handleLineChange(index, 'description', e.target.value)}>
                                            <option value=""></option>
                                            {items.map(i => <option key={i.id} value={i.description}>{i.description}</option>)}
                                        </select>
                                    </td>
                                    <td className="border border-gray-400 p-1"><input type="text" className="w-full outline-none" value={line.note} onChange={e => handleLineChange(index, 'note', e.target.value)} /></td>
                                    <td className="border border-gray-400 p-1"><input type="number" className="w-full outline-none text-right" value={line.quantity} onChange={e => handleLineChange(index, 'quantity', e.target.value)} /></td>
                                    <td className="border border-gray-400 p-1"><input type="number" className="w-full outline-none text-right" value={line.price} onChange={e => handleLineChange(index, 'price', e.target.value)} /></td>
                                    <td className="border border-gray-400 p-1"><input type="number" className="w-full outline-none text-right" value={line.taxRate} onChange={e => handleLineChange(index, 'taxRate', e.target.value)} /></td>
                                    <td className="border border-gray-400 p-1 bg-gray-100 text-right">{formatCurrency(line.exclAmount)}</td>
                                    <td className="border border-gray-400 p-1 bg-gray-100 text-right">{formatCurrency(line.taxAmount)}</td>
                                    <td className="border border-gray-400 p-1 bg-gray-100 text-right">{formatCurrency(line.inclAmount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end mt-6">
                        <div className="w-64 space-y-2">
                            <div className="flex items-center"><label className="w-32 text-sm font-semibold">Total Excl</label><div className="border border-gray-400 flex-1 p-1 bg-white text-right text-sm">{formatCurrency(totals.totalExcl)}</div></div>
                            <div className="flex items-center"><label className="w-32 text-sm font-semibold">Total Tax</label><div className="border border-gray-400 flex-1 p-1 bg-white text-right text-sm">{formatCurrency(totals.totalTax)}</div></div>
                            <div className="flex items-center"><label className="w-32 text-sm font-semibold">Total Incl</label><div className="border border-gray-400 flex-1 p-1 bg-white text-right text-sm font-bold">{formatCurrency(totals.totalIncl)}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesOrder;
