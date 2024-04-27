import TotalRecruitList from './_components/totalRecruitList';
import Personal from './_components/personal';

export default function Home() {
  return (
    <>
      <section className="bg-red-10">
        <div className="py-[60px] md:max-w-[964px] md:m-auto">
          <Personal />
        </div>
      </section>
      <section className="px-3 py-[60px] sm:px-8 md:max-w-[964px] md:m-auto">
        <TotalRecruitList />
      </section>
    </>
  );
}
