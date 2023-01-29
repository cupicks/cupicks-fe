import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import styled from "styled-components";

import block from "../assets/svg/block.svg";
import cancel from "../assets/svg/cancel.svg";
import check from "../assets/svg/check.svg";
import Navigation from "../partial/Navigation";

const Category = () => {
  const {
    register,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
    resetField,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredientList",
  });
  const formData = [
    { id: 1, name: "355ml" },
    { id: 2, name: "457ml" },
    { id: 3, name: "530ml" },
  ];

  const [btnActive, setBtnActive] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const clickBtnActive = ({ target }) => {
    setBtnActive(!btnActive);
    checkedItemHandler(target.parentNode, target.value, target.checked);
    console.log(target.value);
  };
  const checkedItemHandler = (id, btnActive) => {
    if (btnActive) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!btnActive && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
    return checkedItems;
  };
  console.log(checkedItems);

  return (
    <div>
      {/*  */}
      <Navigation goto="/">
        <span className="title">취향 카테고리</span>
      </Navigation>
      <h1>선호옵션</h1>
      {/* {btnActive ? (
        <StBtnI onClick={clickBtnActive}>355ml</StBtnI>
      ) : (
        <StBtn onClick={clickBtnActive}>
          <img src={check} />
          355ml
          <img src={cancel} />
        </StBtn>
      )} */}
      {formData.map((item, idx) => (
        <div key={idx}>
          {btnActive ? (
            <>
              <input
                type="checkbox"
                id={item.id}
                value={item.name}
                checked={btnActive}
                onChange={(e) => clickBtnActive(e)}
              />

              <StLabel htmlFor={item.id}>
                <img src={check} />
                {item.name}
                <img src={cancel} />
              </StLabel>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                id={item.id}
                value={item.name}
                onChange={(e) => clickBtnActive(e)}
              />
              <StLabel htmlFor={item.id}>{item.name}</StLabel>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Category;

const StBtn = styled.button`
  border: 1px solid black;
  background-color: blue;
  color: #fff;
`;
const StBtnI = styled.button`
  border: 1px solid black;
`;
const StLabel = styled.label`
  border: 1px solid black;
  background-color: blue;
  color: #fff;
`;
