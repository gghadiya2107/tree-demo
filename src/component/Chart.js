import React, { Fragment, useState } from "react";
import Card from "./Card";
import style from "./organogram.module.css";

let data1 = [
  {
    id: "1",
    name: "CEO",
    type: "Head of Department",
    isExpand: true,
    leval: "1",
    children: [
      {
        id: "2",
        isExpand: false,
        leval: "2",

        name: "Production Manager",
        children: [
          {
            id: "3",
            isExpand: false,
            leval: "3",
            type: "Consultant",

            name: "Assistant Manager A",
            children: [
              {
                id: "4",
                isExpand: false,
                leval: "4",

                name: "Engineer",
              },
            ],
          },
          {
            id: "5",
            isExpand: false,
            leval: "3",

            name: "Assistant Manager B",
            children: [
              {
                id: "6",
                isExpand: false,
                leval: "4",
                type: "Developer",

                name: "Engineer",
              },
            ],
          },
        ],
      },
      {
        id: "7",
        isExpand: false,
        leval: "2",

        name: "Marketing Manager",
        children: [
          {
            id: "8",
            isExpand: false,
            leval: "3",

            name: "Sales Officer A",
            children: [
              {
                id: "9",
                isExpand: false,
                leval: "4",
                type: "Developer",

                name: "Salesperson",
              },
            ],
          },
          {
            id: "10",
            isExpand: false,
            leval: "3",
            type: "Consultant",

            name: "Sales Officer B",
            children: [
              {
                id: "11",
                isExpand: false,
                leval: "4",

                name: "Salesperson",
              },
            ],
          },
        ],
      },
    ],
  },
];

const Chart = () => {
  const [data, setData] = useState(data1);
  function expandNodes(data) {
    data.forEach((node) => {
      if (node.id != 1) {
        node.isExpand = true;
      }
      if (node.children) {
        expandNodes(node.children);
      }
    });
  }
  function collapseNodes(data) {
    data.forEach((node) => {
      if (node.id != 1) {
        node.isExpand = false;
      }
      if (node.children) {
        collapseNodes(node.children);
      }
    });
  }

  const expandAll = () => {
    let mainData = [...data];

    expandNodes(mainData);

    setData(mainData);
  };
  const collapseAll = () => {
    let mainData = [...data];

    collapseNodes(mainData);

    setData(mainData);
  };

  return (
    <div className={style.main}>
      <button className={style.expanded} onClick={expandAll}>
        Expand All
      </button>
      <button className={style.collaps} onClick={collapseAll}>
        Collapse All
      </button>
      <div className={style.orgTree}>
        <Card data={data} setData={setData} mainData={data} />
      </div>
    </div>
  );
};

export default Chart;
