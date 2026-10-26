
export default function LoadingPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

            <h2 className="text-lg font-semibold text-muted-foreground">
                Loading...
            </h2>

            <p className="text-sm text-muted-foreground">
                Please wait while we prepare everything.
            </p>
        </div>
    );
}
