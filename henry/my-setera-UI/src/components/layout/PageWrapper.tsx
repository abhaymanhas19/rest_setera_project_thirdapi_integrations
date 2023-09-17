import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState, setAppTitleState } from "../../redux/features/appStateSlice";

type Props = {
  state?: string,
  pagetitle?: string,
  children: ReactNode;
};

const PageWrapper = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.state) {
      dispatch(setAppState(props.state));
      dispatch(setAppTitleState(props.pagetitle ? props.pagetitle : "Home"));
    }
  }, [dispatch, props]);

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;