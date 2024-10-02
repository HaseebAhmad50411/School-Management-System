const routes = [
  {
    path: "/index",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/layout",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/home/Dashboard.vue"),
        meta: { auth: true },
      },
    ],
  },
  {
    path: "/",
    component: () => import("pages/auth/LogIn.vue"),
    meta: { auth: false },
  },
  {
    path: "/signUp",
    component: () => import("pages/auth/SignUp.vue"),
    meta: { auth: false },
  },
  {
    path: "/user",
    component: () => import("pages/user/UserList.vue"),
    meta: { auth: true, requiresAdmin: true },
  },
  {
    path: "/home",
    component: () => import("pages/home/Home.vue"),
    meta: { auth: true },
  },

  {
    path: "/student_list",
    component: () => import("pages/student/StudentList.vue"),
    meta: { auth: true },
  },
  {
    path: "/teacher_form",
    component: () => import("pages/teacher/TeacherForm.vue"),
    meta: { auth: true },
  },
  {
    path: "/student_form",
    component: () => import("pages/student/StudentForm.vue"),
    meta: { auth: true },
  },
  {
    path: "/teacher_list",
    component: () => import("pages/teacher/TeacherList.vue"),
    meta: { auth: true },
  },
  {
    path: "/list",
    component: () => import("pages/list.vue"),
    meta: { auth: true },
  },
  {
    path: "/no_teacher_list",
    component: () => import("pages/teacher/NoTeacherList.vue"),
    meta: { auth: true },
  },
  {
    path: "/no_student_list",
    component: () => import("pages/student/NoStudentList.vue"),
    meta: { auth: true },
  },
  {
    path: "/no_subject",
    component: () => import("pages/subject/NoSubjectList.vue"),
    meta: { auth: true },
  },
  {
    path: "/no_course_list",
    component: () => import("pages/course/NoCourseList.vue"),
    meta: { auth: true },
  },
  {
    path: "/course_form",
    component: () => import("pages/course/CourseForm.vue"),
    meta: { auth: true },
  },
  {
    path: "/course_list",
    component: () => import("pages/course/CourseList.vue"),
    meta: { auth: true },
  },
  {
    path: "/table",
    component: () => import("pages/table.vue"),
    meta: { auth: true },
  },
  {
    path: "/subject",
    component: () => import("pages/subject/SubjectList.vue"),
    meta: { auth: true },
  },
  {
    path: "/subject_form",
    component: () => import("pages/subject/SubjectForm.vue"),
    meta: { auth: true },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/example",
    component: () => import("pages/example.vue"),
    meta: { auth: true },
  },
];

export default routes;
