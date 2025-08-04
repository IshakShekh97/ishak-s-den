"use client";

export const Footer = () => {
  return (
    <footer className="py-8 flex items-center justify-between text-muted-foreground px-4 max-w-7xl mx-auto">
      <div>© {new Date().getFullYear()} Ishak Shekh. All rights reserved.</div>
    </footer>
  );
};
