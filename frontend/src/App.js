import React, { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Select from './components/Select';
import Table from './components/Table';

function App() {
  // Form State
  const [formData, setFormData] = useState({
    invoiceNo: '',
    invoiceDate: '',
    clientName: '',
    itemCode: '',
    quantity: '',
    price: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Orders Data
  const [orders, setOrders] = useState([
    { id: 1, invoiceNo: 'INV-2026-001', date: '2026-07-01', clientName: 'Acme Corp', total: 1100.00, status: 'Completed' },
    { id: 2, invoiceNo: 'INV-2026-002', date: '2026-07-02', clientName: 'Globex Inc', total: 450.50, status: 'Pending' },
    { id: 3, invoiceNo: 'INV-2026-003', date: '2026-07-03', clientName: 'Initech', total: 2990.00, status: 'Draft' },
  ]);

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.invoiceNo) errors.invoiceNo = 'Invoice number is required';
    if (!formData.invoiceDate) errors.invoiceDate = 'Date is required';
    if (!formData.clientName) errors.clientName = 'Client selection is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder = {
        id: orders.length + 1,
        invoiceNo: formData.invoiceNo,
        date: formData.invoiceDate,
        clientName: formData.clientName === '1' ? 'Acme Corp' : formData.clientName === '2' ? 'Globex Inc' : 'Initech',
        total: parseFloat(formData.quantity || 0) * parseFloat(formData.price || 0),
        status: 'Pending',
      };
      setOrders((prev) => [newOrder, ...prev]);
      setFormData({
        invoiceNo: '',
        invoiceDate: '',
        clientName: '',
        itemCode: '',
        quantity: '',
        price: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  // Table Headers
  const tableHeaders = [
    { key: 'invoiceNo', label: 'Invoice No' },
    { key: 'date', label: 'Invoice Date' },
    { key: 'clientName', label: 'Client' },
    { key: 'total', label: 'Total Amount', align: 'right' },
    { key: 'status', label: 'Status', align: 'center' },
  ];

  // Custom Table Renderers
  const renderDesktopCell = (item, header) => {
    if (header.key === 'total') {
      return `$${item.total.toFixed(2)}`;
    }
    if (header.key === 'status') {
      const colors = {
        Completed: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Draft: 'bg-gray-100 text-gray-800',
      };
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[item.status] || colors.Draft}`}>
          {item.status}
        </span>
      );
    }
    return item[header.key];
  };

  const renderMobileCard = (item) => {
    const colors = {
      Completed: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Draft: 'bg-gray-100 text-gray-800',
    };
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-primary">{item.invoiceNo}</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[item.status] || colors.Draft}`}>
            {item.status}
          </span>
        </div>
        <div className="text-xs text-gray-500 flex justify-between">
          <span>{item.date}</span>
          <span>{item.clientName}</span>
        </div>
        <div className="text-sm font-semibold text-right text-primary">
          Total: ${item.total.toFixed(2)}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-secondary/30 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">OrderSync Sales Portal</h1>
            <p className="text-sm text-gray-500 mt-1">Design System & Component Showcase</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Settings</Button>
            <Button variant="primary" size="sm">Export Report</Button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Screen 1 Simulation: Create Order Form */}
          <section className="lg:col-span-1 bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-primary">Screen 1: Create Sales Order</h2>
              <p className="text-xs text-gray-500 mt-1">Simulated Form utilizing custom inputs and buttons</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Input
                label="Invoice Number"
                name="invoiceNo"
                placeholder="INV-2026-XXX"
                value={formData.invoiceNo}
                onChange={handleInputChange}
                error={formErrors.invoiceNo}
                required
              />

              <Input
                label="Invoice Date"
                name="invoiceDate"
                type="date"
                value={formData.invoiceDate}
                onChange={handleInputChange}
                error={formErrors.invoiceDate}
                required
              />

              <Select
                label="Client"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                error={formErrors.clientName}
                required
              >
                <option value="">Select a client</option>
                <option value="1">Acme Corp</option>
                <option value="2">Globex Inc</option>
                <option value="3">Initech</option>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Quantity"
                  name="quantity"
                  type="number"
                  placeholder="0"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
                <Input
                  label="Unit Price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Save Sales Order
                </Button>
              </div>
            </form>
          </section>

          {/* Screen 2 Simulation: Sales Orders List */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-primary">Screen 2: Sales Orders</h2>
                <p className="text-xs text-gray-500 mt-1">Responsive listing (desktop table view & mobile card list)</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                {orders.length} Total
              </span>
            </div>

            <Table
              headers={tableHeaders}
              data={orders}
              renderDesktopCell={renderDesktopCell}
              renderMobileCard={renderMobileCard}
              keyExtractor={(item) => item.id.toString()}
            />
          </section>
          
        </div>
      </div>
    </div>
  );
}

export default App;
