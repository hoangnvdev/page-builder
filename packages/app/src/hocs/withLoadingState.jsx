import { useEffect, useState } from "react";

import { ErrorDisplay, LoadingIndicator } from "@/components";

export const withLoadingState = (
  WrappedComponent,
  {
    fetchData,
    LoadingComponent = LoadingIndicator,
    ErrorComponent = ErrorDisplay,
    loadingProps = {},
    errorProps = {},
  } = {},
) => {
  const WithLoadingState = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let mounted = true;

      const loadData = async () => {
        try {
          setLoading(true);
          setError(null);

          let result = null;
          if (fetchData) {
            result = await fetchData(props);
          }

          if (mounted) {
            setData(result);
            setLoading(false);
          }
        } catch (err) {
          if (mounted) {
            setError(err.message || "An error occurred");
            setLoading(false);
          }
        }
      };

      loadData();

      return () => {
        mounted = false;
      };
    }, [props]);

    if (loading) {
      return <LoadingComponent {...loadingProps} />;
    }

    if (error) {
      return <ErrorComponent message={error} {...errorProps} />;
    }

    return <WrappedComponent {...props} data={data} />;
  };

  WithLoadingState.displayName = `withLoadingState(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithLoadingState;
};
