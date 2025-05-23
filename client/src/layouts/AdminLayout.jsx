import { Outlet, NavLink , useNavigate} from "react-router-dom";
import { logout } from "../utils/auth";
const AdminLayout = () => {
  const navigate = useNavigate()
  const dashboardicon = (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
    </svg>
  );

  // const overviewicon = (
  //   <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  //     <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z" />
  //   </svg>
  // );

  const addCourseIcon = (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 5v14m7-7H5" />
    </svg>
  );
  

  const chapterIcon = (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M3 5h18M3 12h18M3 19h18" />
    </svg>
  );
  const questionIcon = (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zM12 3c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM12 9c-.697 0-1.25.553-1.25 1.25S11.303 11.5 12 11.5c.697 0 1.25-.553 1.25-1.25S12.697 9 12 9zM12 15c-.697 0-1.25.553-1.25 1.25S11.303 17 12 17c.697 0 1.25-.553 1.25-1.25S12.697 15 12 15z" />
    </svg>
  );

  const allCoursesIcon = (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4 4h16c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V6c0-1.104.896-2 2-2zm8 3v12m-4-9h8m-8 3h8m-8 3h8" />
    </svg>
  );
  const allChaptersViewIcon = (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4 4h16c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V6c0-1.104.896-2 2-2zm0 4h16m-8 4h8m-8 4h8" />
    </svg>
  );
    
    

  const sidebarLinks = [
    { name: "Dashboard", path: "/admin", icon: dashboardicon },
    { name: "Add Courses", path: "/admin/courses", icon: addCourseIcon },
    { name: "Add Chapters", path: "/admin/chapters", icon: chapterIcon },
    { name: "Add Questions", path: "/admin/questions", icon: questionIcon },
    { name: "Add Bulk Questions", path: "/admin/bulk-questions", icon: questionIcon },
    { name: "View Courses ", path: "/admin/course-list", icon: allCoursesIcon },
    { name: "View Chapters", path: "/admin/chapter-list", icon: allChaptersViewIcon },
  ];

  return (
    <>
      {/* Main Layout Container */}
      <div className="min-h-screen flex flex-col">

        {/* Sticky Topbar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
          <NavLink to="/admin" className="block bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-xl font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 p-4 text-center">
  <h2>🚀 GIIT Admin Dashboard</h2>
</NavLink>

          <div className="flex items-center gap-5 text-gray-500">
            <p>Hi! Admin</p>
            <button className="border rounded-full text-sm px-4 py-1" onClick={()=>{
              logout();
              navigate("/auth")
            }}>Logout</button>
          </div>
        </div>

        {/* Content Below Header */}
        <div className="flex flex-1 overflow-hidden">

          {/* Sticky Sidebar */}
          <div className="sticky top-[60px] md:w-64 w-16 border-r h-[calc(100vh-60px)] text-base border-gray-300 pt-4 flex flex-col">
            {sidebarLinks.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 gap-3 ${
                    isActive
                      ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                      : "hover:bg-gray-100/90 border-white text-gray-700"
                  }`
                }
              >
                {item.icon}
                <p className="md:block hidden text-center">{item.name}</p>
              </NavLink>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </div>
        </div>

      </div>
    </>
  );
};

export default AdminLayout;
