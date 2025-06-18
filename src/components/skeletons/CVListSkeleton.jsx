import Skeleton from "@mui/material/Skeleton";
import DescriptionIcon from "@mui/icons-material/Description";

const CVListSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            {[1].map((index) => (
                <div
                    key={index}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-3 py-2"
                >
                    <div className="flex h-[42px] min-w-0 items-center gap-3">
                        <Skeleton animation="wave" variant="circular" width={16} height={16} />
                        <DescriptionIcon className="text-gray-300" />
                        <div className="flex min-w-0 flex-col">
                            <Skeleton animation="wave" variant="text" width={128} height={16} />
                            <Skeleton animation="wave" variant="text" width={96} height={12} sx={{ mt: 0.5 }} />
                        </div>
                    </div>
                    <Skeleton animation="wave" variant="circular" width={24} height={24} />
                </div>
            ))}
        </div>
    );
};

export default CVListSkeleton;
