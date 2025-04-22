const Footer = () => {
  return (
    <footer className="border-t border-[#082376] py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xs text-gray-300">
          &copy; {new Date().getFullYear()} Copyright by Aboki.
          <span className="text-[#082370]">eth</span>
        </p>

        <div className="flex gap-4 mt-2 sm:mt-0">
          <button className="text-xs text-gray-500 hover:text-white transition cursor-pointer">
            Privacy Policy
          </button>
          <button className="text-xs text-gray-500 hover:text-white transition cursor-pointer">
            Terms of Use
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
