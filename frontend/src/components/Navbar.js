function Navbar() {
  return (
    <header className="flex justify-between items-center h-20 px-margin w-full sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center gap-xl">
        <div className="flex flex-col">
          <span className="text-2xl font-extrabold text-primary tracking-tight">NyayaSarthi</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">GovTech AI</span>
        </div>
        <nav className="hidden lg:flex gap-lg items-center h-full ml-8">
          <a className="text-sm font-semibold text-secondary border-b-2 border-secondary h-20 flex items-center px-2" href="#case-processor">
            Case Processor
          </a>
          <a className="text-sm font-medium text-slate-500 hover:text-primary transition-colors h-20 flex items-center px-2" href="#verification-queue">
            Verification Queue
          </a>
          <a className="text-sm font-medium text-slate-500 hover:text-primary transition-colors h-20 flex items-center px-2" href="#archive-section">
            Archive
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-md">
        <div className="text-right hidden sm:block mr-2">
          <p className="text-sm font-bold text-slate-900 leading-none">Senior Auditor</p>
          <p className="text-[11px] text-slate-500 font-medium">Judiciary Dept.</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant shadow-sm">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLH5o4PegFyB0Lts1LzPx5d-MQ8TulAQCM1HtqQrGfrn6njML2UokTGuoxC0SB3eERHf7IudBqzSKyS7QeRHiBUY25GwOrY-7kNYGhzi6AvfWWPuHBVDvcshwq_QfTnBra0LKV6NiexeyvlDsxZqENEaJDitbaJgKGYnRMchtL6Fsv5lRoZUCgtUZuszPePzZxS2-UIDtDTeKy--Tgc9SdmqGlMf3ruLzAIO4LJhXarKWdos-orjkZ9mslJ0T2bNohS8ybXn-rdxM"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
