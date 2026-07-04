import React from 'react';

const OrderTable = ({
  headers = [],
  data = [],
  renderMobileCard,
  renderDesktopCell,
  keyExtractor,
  emptyMessage = 'No data available',
  className = '',
}) => {
  const getRowKey = (item, index) => {
    if (keyExtractor) return keyExtractor(item, index);
    return item.id || item.Id || index;
  };

  const getAlignmentClass = (align) => {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  };

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-border bg-white shadow-sm ${className}`}>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-full border-collapse">
          <thead>
            <tr className="bg-secondary border-b border-border">
              {headers.map((h, i) => (
                <th
                  key={h.key || i}
                  className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-primary font-sans ${getAlignmentClass(h.align)} ${h.className || ''}`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="py-8 text-center text-sm font-sans text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={getRowKey(item, index)}
                  className="hover:bg-gray-50/50 transition-colors duration-150"
                >
                  {headers.map((h, colIndex) => (
                    <td
                      key={h.key || colIndex}
                      className={`py-4 px-4 text-sm text-primary font-sans font-normal ${getAlignmentClass(h.align)} ${h.className || ''}`}
                    >
                      {renderDesktopCell ? (
                        renderDesktopCell(item, h, index)
                      ) : (
                        item[h.key] !== undefined ? String(item[h.key]) : ''
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden divide-y divide-border">
        {data.length === 0 ? (
          <div className="py-8 text-center text-sm font-sans text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          data.map((item, index) => (
            <div
              key={getRowKey(item, index)}
              className="p-4 bg-white space-y-2.5 active:bg-gray-50/50 transition-colors"
            >
              {renderMobileCard ? (
                renderMobileCard(item, index)
              ) : (
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  {headers.map((h, i) => (
                    <React.Fragment key={h.key || i}>
                      <div className="font-semibold text-gray-500 uppercase tracking-wider">
                        {h.label}:
                      </div>
                      <div className={`text-primary ${getAlignmentClass(h.align)}`}>
                        {item[h.key] !== undefined ? String(item[h.key]) : ''}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderTable;
