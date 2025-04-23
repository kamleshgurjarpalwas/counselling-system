import { Button } from "@/components/ui/button";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title = "Are you sure?", message = "This action cannot be undone." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
          {message}
        </p>
        <div className="flex justify-end gap-2 md:gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            size="sm"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            size="sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}