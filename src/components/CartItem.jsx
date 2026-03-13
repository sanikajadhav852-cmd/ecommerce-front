// src/components/CartItem.jsx
import { Plus, Minus, Trash2 } from 'lucide-react';

export default function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="flex items-center gap-6 py-6 border-b border-gray-100 dark:border-slate-800 last:border-b-0">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={item.image || '/placeholder-product.jpg'}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg line-clamp-2 text-text-pri dark:text-slate-100">{item.name}</h3>
        {item.variant_name && (
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Variant: {item.variant_name}</p>
        )}
        <p className="text-primary dark:text-primary-light font-medium mt-2">
          ₹{item.price} × {item.qty}
        </p>
      </div>

      {/* Quantity & Remove */}
      <div className="flex flex-col items-end gap-4">
        <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-md">
          <button
            onClick={() => onQtyChange(item.id, item.qty - 1)}
            disabled={item.qty <= 1}
            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50 text-text-pri dark:text-slate-200"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-2 font-medium text-text-pri dark:text-slate-200 border-x border-gray-200 dark:border-slate-700">{item.qty}</span>
          <button
            onClick={() => onQtyChange(item.id, item.qty + 1)}
            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-text-pri dark:text-slate-200"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 text-sm transition-colors"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}