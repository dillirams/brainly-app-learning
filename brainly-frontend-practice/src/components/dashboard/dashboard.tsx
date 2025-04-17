import { useState } from "react";
import { Button } from "../button";
import { CartTop } from "../cart/cart-top";
import { CardBox } from "../cart/outer-cart";
import { BookIcon } from "../icon/book";
import { DeleteIcon } from "../icon/delete";
import { PlusIcon } from "../icon/plus";
import { ShareIcon } from "../icon/share";
import { YoutubeFrame } from "../icon/youtube";
import { CartInputModel } from "../cart/inputModel";
import { useContent } from "../../hook/hook";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const content=useContent();

  return (
    <div className="">
      <CartInputModel
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <div className="flex justify-between px-7 m-2 top-0 left-0 ">
        <div className="md:pl-50 text-4xl font-medium ">All Notes</div>
        <div className="flex gap-4">
          <Button
            varient="secondary"
            size="lg"
            text="share"
            startIcon={<ShareIcon size="sm" />}
            onclick={() => {}}
          />
          <Button
            varient="primary"
            size="lg"
            text="Add Content"
            startIcon={<PlusIcon size="sm" />}
            onclick={() => {
              setOpen(true);
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
      <CardBox
          cartTop={
            <CartTop
              startIcon={<BookIcon size="sm" />}
              text="youtube"
              middleIcon={<ShareIcon size="sm" />}
              endICon={<DeleteIcon size="sm" />}
            />
          }
          frame={<YoutubeFrame />}
        />
           {content.map(({ title }) => (
                 <CardBox
                 cartTop={
                   <CartTop
                     startIcon={<BookIcon size="sm" />}
                     text={title}
                     middleIcon={<ShareIcon size="sm" />}
                     endICon={<DeleteIcon size="sm" />}
                   />
                 }
                 frame={<YoutubeFrame />}
               />
              ))}
        
       
        
       
        
      </div>
    </div>
  );
};
