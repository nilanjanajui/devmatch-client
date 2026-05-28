export default function PrivateLayout({ children }) {
    return (
        <div className="min-h-screen bg-background">
            {children}
        </div>
    );
}