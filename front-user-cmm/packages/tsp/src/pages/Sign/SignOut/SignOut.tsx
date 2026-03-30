import {useEffect} from 'react';
import authentication from 'shared/authentication';
import {useNavigate} from "react-router-dom";
import {AxiosPost} from "shared/libs/axios";
import {SignService} from "~/Service/SignService";

const SignOut = () => {
  const navigation = useNavigate();
  const logout = async () => {
    const res = await SignService.SignOut().then((data: any) => {
      authentication.remove()
    }).catch(reason => {authentication.remove()})
    navigation('/tsp/SignIn')
  }

  useEffect(() => {
    logout().then()
  }, [])

  return <div/>;
}

export default SignOut;
