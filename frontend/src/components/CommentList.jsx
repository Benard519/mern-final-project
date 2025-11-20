import { formatDate } from '../utils/formatters';

const CommentList = ({ comments = [], onDelete, currentUserId }) => {
  if (!comments.length) {
    return <p className="text-sm text-slate-500">No comments yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">{comment.user?.name}</p>
              <p className="text-xs text-slate-400">{formatDate(comment.createdAt)}</p>
            </div>
            {currentUserId === comment.user?._id && (
              <button
                type="button"
                onClick={() => onDelete?.(comment._id)}
                className="text-xs font-semibold text-rose-500"
              >
                Delete
              </button>
            )}
          </div>
          <p className="mt-3 text-sm text-slate-600">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

