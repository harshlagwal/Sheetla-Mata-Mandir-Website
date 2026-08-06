import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // We can log the error to an error reporting service here in the future
    // In production, we intentionally do NOT expose the raw stack trace to the user
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fcf9f5] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white border border-[#d4af37]/30 rounded-3xl p-8 max-w-md w-full shadow-lg flex flex-col items-center">
            <div className="w-16 h-16 bg-[#5c1616]/10 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-[#5c1616]" />
            </div>
            <h1 className="font-display font-bold text-2xl text-[#5c1616] mb-3">
              Something went wrong
            </h1>
            <p className="font-body text-sm text-[#422a26]/70 leading-relaxed mb-8">
              We're sorry, but the application encountered an unexpected error. Please try reloading the page.
            </p>
            <button
              onClick={this.handleReload}
              className="flex items-center gap-2 bg-[#5c1616] text-white px-6 py-3 rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full justify-center"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
