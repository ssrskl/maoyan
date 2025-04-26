interface ArticleTagProps {
    icon: React.ReactNode | string;
    tagName: string;
  }
  
  export const ArticleTag = ({ icon, tagName }: ArticleTagProps) => {
    return (
      <div className="flex items-center space-x-2 text-lg border border-zinc-300 rounded-2xl py-2 px-4 hover:bg-stone-200 cursor-pointer">
        {typeof icon === "string" ? (
          <img src={icon} alt={tagName} className="w-6 h-6 rounded-lg" />
        ) : (
          icon
        )}
        <p>{tagName}</p>
      </div>
    );
  };