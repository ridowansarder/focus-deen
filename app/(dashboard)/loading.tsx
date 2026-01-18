const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 border-4 border-border border-t-primary rounded-full animate-spin"></div>
        <p className="mt-3 text-base font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
