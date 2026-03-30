import { Component, ErrorInfo, ReactNode } from 'react';
import InternalServerError from './InternalServerError';
interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorInfo?:any;
  error?: any;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorInfo:{},
    error: {},
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // log
    this.setState({
      error: error
    });
    console.log("ErrorBoundary :: -> componentDidCatch:",error, errorInfo);
  }

  public render() {
    window.addEventListener('popstate', () => {
      window.location.reload();
    });
    if (this.state.hasError) {
      return <InternalServerError error={this.state.error}/>;
    }

    return this.props.children && (this.props.children as JSX.Element);
  }
}

export default ErrorBoundary;
