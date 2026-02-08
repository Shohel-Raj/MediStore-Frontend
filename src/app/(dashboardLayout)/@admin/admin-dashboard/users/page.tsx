import AdminUserManagement from "@/components/admin/AdminUserManagement";
import { adminServerService } from "@/services/admin/admin.service.server";

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page ?? 1);
  const search = searchParams.search;

  const res = await adminServerService.getAllUsers(page, 10, search);

  return (
    <AdminUserManagement
      users={res.data}
      pagination={res.pagination}
      currentPage={page}
      search={search}
    />
  );
}
