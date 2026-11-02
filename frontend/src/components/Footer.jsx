const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white flex flex-col justify-center items-center w-full py-2 text-xs">
            <div className="logo font-semibold text-lg">
                <span className="text-amber-500">Cattle</span>
                <span>Breed</span>
                <span className="text-amber-500">Classifier</span>
            </div>
            <div className="text-center mt-1">
                &copy; {new Date().getFullYear()}  Rahul-dev | All Rights Reserved
            </div>
        </footer>
    );
};

export default Footer;
