import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

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

function submitSignIn(e){
    e.preventDefault();
    const formEmail = e.target.form[0].value;
    const formPassword = e.target.form[1].value;
    console.log(email, password);


}

export default function SignIn(){
    return (
        <div>
            <form>
                <label for="email">
                    Email
                    <input type="email" name="email" id="email" />
                </label>
                <label for="password">
                    Password
                    <input type="password" name="password" id="password" />
                </label>
                <button type="submit" onClick={submitSignIn}>Sign In</button>

            </form>
        </div>
    )
}