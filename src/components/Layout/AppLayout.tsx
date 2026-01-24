import React from 'react';
import Navbar from '../Navbar/Navbar';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <Navbar />
            <main className="pt-16">
                {children}
            </main>
            <footer className="bg-secondary text-secondary-foreground py-12 mt-12 border-t">
                <div className="max-w-[1400px] mx-auto px-4 flex justify-between">
                    <div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">MoviesDekho</h3>
                    </div>
                    <div>
                        <p>&copy; {new Date().getFullYear()} MoviesDekho. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;
