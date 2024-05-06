import React, { Fragment } from "react";
import style from "./organogram.module.css";

// import arrow from "/arrow.png";
// import up from "../../public/up.png";
// import office from "../../public/office (2).png";
// import office2 from "../../public/office-building (1).png";
// import office3 from "../../public/office-building.png";
// import office4 from "../../public/office (1).png";
// import dots from "../../public/dots.png";

const Card = (props) => {
  const replaceObjectWithId = (id, newObj, mainData) => {
    return mainData.map((node) => {
      if (node.children) {
        node.children = replaceObjectWithId(id, newObj, node.children);
      }
      return node.id === id ? newObj : node;
    });
  };

  const hideChild = (index) => {
    let old = [...props.data];
    let mainData = props.mainData;
    hideElement(old, index, mainData);
  };

  const hideElement = (array, index, mainData) => {
    let singleData = array.find((v) => v?.id == index);

    let newData = singleData?.children?.map((v) => ({
      ...v,
      isExpand: !v?.isExpand,
    }));
    singleData = { ...singleData, children: newData };

    const updatedHierarchy = replaceObjectWithId(index, singleData, mainData);
    props.setData(updatedHierarchy);
  };

  const images = (leval) => {
    if (leval == "1") {
      return "/office (2).png";
    }
    if (leval == "2") {
      return "/office (1).png";
    }
    if (leval == "3") {
      return "/office-building.png";
    }
    if (leval == "4") {
      return "/office-building (1).png";
    }
  };

  return (
    <>
      <ul>
        {props.data.map((item, index) => (
          <Fragment key={item.name}>
            {item?.isExpand && (
              <li>
                <div className={style.card}>
                  <div className={style.cardBody}>
                    {/* <img className="menu" src={dots} /> */}
                    <div className={style.imgBg}>
                      <img
                        className={style.office}
                        src={images(item.leval)}
                        height={30}
                        width={30}
                      />
                      {item?.children?.length && (
                        <p className={style.branches}>
                          {item?.children?.length}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className={style.title}>{item.name}</p>
                      <p className={style.type}>{item.type}</p>
                    </div>
                    {item?.children?.length && (
                      <img
                        className={style.img}
                        src={
                          item.children?.[0]?.isExpand
                            ? "/up.png"
                            : "/arrow.png"
                        }
                        height={10}
                        width={10}
                        onClick={(e) => {
                          hideChild(item.id);
                        }}
                      />
                    )}
                  </div>

                  <div></div>
                </div>
                {item.children?.length && item.children?.[0]?.isExpand && (
                  <Card
                    data={item.children}
                    setData={props.setData}
                    mainData={props.mainData}
                  />
                )}
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </>
  );
};

export default Card;
