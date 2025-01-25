// AuthContext.js
import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [postModalOpen,setPostModalOpen] = useState(false)
    const [editModalOpen,setEditModalOpen] = useState(false)
    const [idEditPost,setIdEditPost] = useState(null)
    const [quoteModalOpen,setQuoteModalOpen] = useState(false)
    const [quotePost,setQuotePost] = useState(false)
    const [replyModalOpen,setReplyModalOpen] = useState(false)

  return (
    <ModalContext.Provider 
    value={{
        postModalOpen,setPostModalOpen,
        editModalOpen,setEditModalOpen,
        idEditPost,setIdEditPost,
        quoteModalOpen,setQuoteModalOpen,
        quotePost,setQuotePost,
        replyModalOpen,setReplyModalOpen
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext,ModalProvider };