const AuthButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}> = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className='group h-12 px-6 border-2 border-gray-600 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-900 active:bg-blue-800'
  >
    <div className='relative flex items-center space-x-4 justify-center'>
      <div className='absolute left-0 w-5'>{icon}</div>
      <span className='block w-max font-semibold tracking-wide text-textPrimary text-sm transition duration-300 group-hover:text-blue-300 sm:text-base'>
        {label}
      </span>
    </div>
  </button>
);

export default AuthButton;
