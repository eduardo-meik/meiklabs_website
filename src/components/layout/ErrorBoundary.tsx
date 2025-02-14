import React, { Component, ErrorInfo } from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container size="sm" className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-dark mb-4">Algo salió mal</h1>
            <p className="text-gray-600 mb-8">
              Nos disculpamos por las molestias. Por favor, intente refrescar la página o contacte con soporte si el problema persiste.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Refrescar Página
            </Button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}