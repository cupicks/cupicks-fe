import IsIcedIcon from "../components/recipeDetail/element/IsIcedIcon";
import IngredientsContainer from "../components/recipeDetail/IngredientsContainer";
import RecipeDesc from "../components/recipeDetail/RecipeDesc";
import Navigation from "../partial/Navigation";

import styled from "styled-components";
import axios from "axios";

const RecipeDetail = () => {

  const data = new FormData();
  data.append("email", "workstation19961002.til@gmail.com")
  data.append("password", "hello1234@")

  const bodyData = {
    email: "workstation19961002.til@gmail.com",
    password: "hello1234@"
  }

  const queryString = Object.keys(bodyData)
  .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(bodyData[k]))
  .join("&"); // queryString 국제표준

  console.log(queryString);

  const sendEmailVerifyCode = async () => {
      try {
        const res = await axios.get(
          "http://3.38.250.115/api/auth/send-email?email=dusunax@gmail.com",
        {
          headers: { 
            'content-type': "application/x-www-form-urlencoded"
          },
        }
      );
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
    };
    sendEmailVerifyCode();
  
  // const temp = async () => {
  //   console.log(data.get('email'));
  //   try {
  //     // const result = await axios.get('http://3.38.250.115/api/recipes/1', 
  //     const result = await axios.get('http://3.38.250.115/api/profile',
  //       // const result = await axios.post('http://3.38.250.115/api/auth/signin',
  //       // queryString,
  //       // {
  //       //   headers: {
  //           // 'content-type': "application/json"
  //           // 'content-type': "multi-part/form-data; charset=utf-8"
  //         //   'content-type': "application/x-www-form-urlencoded"
  //         // }
  //       // }
  //     )
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // temp();

  const recipe = {
    recipeId: 123456,
    title: '레시피 이름',
    content: '레시피 본문입니다.',
    isIced: true,
    cupSize: 473,
    ingredientList: [
      {
        ingredientName: '커피',
        ingredientColor: '#884712',
        ingredientAmount: 50
      },
      {
        ingredientName: '우유',
        ingredientColor: '#fff7ea',
        ingredientAmount: 200
      },
      {
        ingredientName: '시럽',
        ingredientColor: '#ffb641',
        ingredientAmount: 100
      }
    ]
  }
  
  return (
    <StWrap>

      <Navigation>
        <div className="icon_box fcc">
          <IsIcedIcon isIced={recipe.isIced} />
        </div>
      </Navigation>

      <IngredientsContainer recipe={recipe} />
      <RecipeDesc recipe={recipe} />
    
    </StWrap>
  );
};

export default RecipeDetail;

const StWrap = styled.div`
  height: 100%;
  overflow-y: scroll;

  .icon_box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 4px;
    margin-right: 10px;

    background-color: #444;
    color: #fff;
  }
`