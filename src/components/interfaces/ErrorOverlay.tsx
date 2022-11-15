import Image from 'next/image';

export function ErrorOverlay() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h6>문제가 발생했어요 :&#40;</h6>

      <Image
        src="/undraw_not_found_-60-pq.svg"
        alt="Not Found"
        loading="lazy"
        width={160}
        height={160}
      />
    </div>
  );
}
