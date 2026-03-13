// src/components/Loader.jsx
export default function Loader({ size = 'medium' }) {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`${sizes[size]} border-4 border-primary/20 dark:border-primary/10 border-t-primary dark:border-t-primary-light rounded-full animate-spin transition-colors`}
      ></div>
    </div>
  );
}