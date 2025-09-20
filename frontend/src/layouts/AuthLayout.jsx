const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#1A1A1A] text-white">
      <div className="w-full max-w-md bg-[#121212] p-8 rounded-lg shadow-lg border border-gray-800">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
