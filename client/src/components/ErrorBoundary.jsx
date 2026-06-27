import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-20 px-4 max-w-xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-rose-50 border border-rose-200 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-rose-900 mb-2">Something went wrong while rendering dashboard</h3>
            <p className="text-xs text-rose-700 mb-6 font-mono bg-white/60 p-3 rounded-xl border border-rose-200 overflow-x-auto text-left">
              {this.state.error?.toString() || 'Unknown React rendering error'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (this.props.onReset) this.props.onReset();
              }}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 mx-auto shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset & Upload Again</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
