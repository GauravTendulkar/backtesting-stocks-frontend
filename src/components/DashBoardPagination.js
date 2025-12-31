"use client";

import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import DialogForDelete from "./DialogForDelete";
import axios from "axios";
import { backendUrl } from "@/json-data/backendServer";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { getTokenForClientSessionData } from "@/utils/security";

const DashBoardPagination = ({ items, totalPages, page, session = null }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  if (!session) {
    router.push("/sign-in");
    return null;
  }

  const handleDelete = async (id) => {
    setIsDialogOpen(false);
    try {
      await axios.post(
        `${backendUrl}equations/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await getTokenForClientSessionData()}`,
          },
        }
      );

      if (items.length === 1 && page > 1) {
        router.push(`/dashboard/${page - 1}`);
      } else {
        router.push(`/dashboard/${page}`);
      }
      router.refresh();
      toast({
        description: "Deleted Successfully!",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        variant: "destructive",
        description: "Failed to delete item. Please try again.",
      });
    }
  };

  const statStyle = "flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400";

  return (
    <>
      <div className="container mx-auto mt-6 mb-6 px-4 md:px-8 space-y-8 min-h-[300px]">
        {/* Empty State */}
        {items.length === 0 && page === 1 ? (
          <Card className="flex flex-col items-center justify-center py-16 px-8 rounded-3xl shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            <h2 className="text-2xl font-extrabold mb-6">Create a New Strategy</h2>
            <Button
              size="lg"
              onClick={() => router.push(`/strategy-builder`)}
              className="px-8"
            >
              Create
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <Card
                key={item._id}
                className="p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Title Link */}
                  <Button
                    variant="link"
                    className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-fit whitespace-nowrap"
                    onClick={() => router.push(`/strategy-builder/${item.link}`)}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData(
                        "text/plain",
                        `${window.location.origin}/strategy-builder/${item.link}`
                      )
                    }
                  >
                    {item.title}
                  </Button>

                  {/* Likes / Dislikes */}
                  <div className="flex space-x-6 text-gray-700 dark:text-gray-300">
                    <div className={statStyle} title="Likes">
                      <ThumbsUp size={18} className="text-green-600" />
                      <span>{item.likes ?? 0}</span>
                    </div>
                    <div className={statStyle} title="Dislikes">
                      <ThumbsDown size={18} className="text-red-600" />
                      <span>{item.dislikes ?? 0}</span>
                    </div>
                  </div>
                </div>

                {/* Time Info */}
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1 sm:space-y-0 sm:flex sm:space-x-6">
                  <p>
                    <strong>Updated:</strong>{" "}
                    {new Date(item.updated_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Created:</strong> {new Date(item.created).toLocaleString()}
                  </p>
                </div>

                {/* Delete Button */}
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="px-5"
                    onClick={() => {
                      setIsDialogOpen(true);
                      setDeleteID(item._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} />
      </div>

      {/* Delete Confirmation Dialog */}
      {isDialogOpen && (
        <DialogForDelete
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          valueID={deleteID}
          handleDeleteProp={handleDelete}
        />
      )}
    </>
  );
};

export default DashBoardPagination;

const Pagination = ({ page, totalPages }) => {
  const router = useRouter();

  const range = 5;

  const pagesArray = useMemo(() => {
    const fullRange = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= range + 1) {
      return fullRange;
    }

    const index = fullRange.indexOf(page);
    const half = Math.floor(range / 2);

    let start = Math.max(0, index - half);
    let end = start + range;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(0, end - range);
    }

    return fullRange.slice(start, end);
  }, [page, totalPages, range]);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <Button
        variant="ghost"
        className={`${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={page === 1}
        onClick={() => router.push(`/dashboard/${page - 1}`)}
      >
        Previous
      </Button>

      {pagesArray.map((num) => (
        <Button
          key={num}
          variant={num === page ? "default" : "ghost"}
          onClick={() => router.push(`/dashboard/${num}`)}
          aria-current={num === page ? "page" : undefined}
          className={num === page ? "font-bold" : ""}
        >
          {num}
        </Button>
      ))}

      <Button
        variant="ghost"
        className={`${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={page === totalPages}
        onClick={() => router.push(`/dashboard/${page + 1}`)}
      >
        Next
      </Button>
    </div>
  );
};
