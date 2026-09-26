import { Routes, Route, useLocation } from "react-router";
import { Account } from "./pages/Account";
import { Layout } from "./layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Document } from "./pages/Document";
import { AddDocument } from "./pages/AddDocument";
import { NoteDetails } from "./components/notes/NoteDetails";
import { Category } from "./pages/Category";
import { useState, useEffect } from "react";
import { getCategory } from "./components/fetchData/getCategory";
import { Archive } from "./pages/Archive";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { ProtectedRoute } from "./pages/ProtectedRoute";

function App() {
  const [category, setCategory] = useState([]);
  const location = useLocation();

  const loadCategory = async () => {
    const data = await getCategory();

    setCategory(data.data);
  };

  useEffect(() => {
    if (location.pathname !== "/account" && localStorage.getItem("token")) {
      loadCategory();
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/account" element={<Account />} />
      <Route path="/account/forgotpassword" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout category={category} />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/*  */}
          <Route
            path="document/category"
            element={
              <Category category={category} loadCategory={loadCategory} />
            }
          />
          {/*  */}
          <Route
            path="document"
            element={<AddDocument category={category} />}
          />
          {/*  */}
          <Route path="document/:categoryId" element={<Document />} />
          <Route
            path="document/:categoryId/:id"
            element={
              <NoteDetails category={category} loadCategory={loadCategory} />
            }
          />
          <Route
            path="document/archive"
            element={<Archive loadCategory={loadCategory} />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
