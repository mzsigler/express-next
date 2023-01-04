import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY, useUser } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;





export default function LogIn(){
    
    const [signIn, {data, loading}] = useMutation(SIGNIN_MUTATION);

    async function submitSignIn(e){
        e.preventDefault();
        const formEmail = e.target.form[0].value;
        const formPassword = e.target.form[1].value;
        
        const res = await signIn({
            variables: {
                email: formEmail, 
                password: formPassword,
            },
            refetchQueries: [{CURRENT_USER_QUERY}],
        });

        console.log(res.data.authenticateUserWithPassword)
    
    }



    return (
        <div>
            <form>
                <label htmlFor="email">
                    Email
                    <input type="email" name="email" id="email" />
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" name="password" id="password" />
                </label>
                <button type="submit" onClick={submitSignIn}>Sign In</button>

            </form>
        </div>
    )
}