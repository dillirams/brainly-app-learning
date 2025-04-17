import { useState } from "react";

import { Button } from "../Button/button";
import { Card } from "../Card/card";
import { CreateContentModel } from "../Card/contentmodel";
import { PlusIcon } from "../Icons/plus";
import { ShareIcon } from "../Icons/share";
import { SideBar } from "../sidebar/sidebar";
import { useContent } from "../../hooks/hook";
import axios from "axios";

export function Dashboard() {
  const [openModel, setOpenModel] = useState(false);

  const contents = useContent();

  return (
    <>
      <div className="">
        <CreateContentModel
          open={openModel}
          onClose={() => {
            setOpenModel(false);
          }}
        />
        <div className="">
          <SideBar />
          <div className="ml-77 bg-gray-50 min-h-screen ">
            <div className="flex justify-end p-4 gap-4  ">
              <Button
                variants="secondary"
                size="lg"
                text="Share Brain"
                startIcon={<ShareIcon size="sm" />}
                onClick={async () => {
                  const response = await axios.post(
                    "http://localhost:3000/user/share",
                    {
                      share: true,
                    },
                    {
                      headers: {
                        token: localStorage.getItem("token"),
                      },
                    }
                  );
                  const shareUrl = response.data.link;
                  alert(shareUrl);
                }}
              />
              <Button
                variants="primary"
                size="lg"
                text="Add content"
                startIcon={<PlusIcon size="sm" />}
                onClick={() => {
                  setOpenModel(true);
                }}
              />
            </div>
            <div className="flex p-10 gap-4 flex-wrap">
              {contents.map(({ title, link, type }) => (
                <Card title={title} link={link} type={type} />
              ))}

              {/* <Card title='twitter-post' link='djd' type='twitter'/> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
