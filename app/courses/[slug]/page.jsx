import Navigation from "@/app/components/Navigation";
import { RichText } from "@graphcms/rich-text-react-renderer";

async function getCourse(slug) {
  const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query Course($slug: String!) {
            course(where: {slug: $slug}) {
                createdAt
                id
                slug
                publishedAt
                title
                updatedAt
                body {
                    json
                    references {
                        ... on Asset {
                            __typename
                            id
                            url
                            mimeType
                        }
                    }
                }
                modules: moduleModels {
                    isLocked
                    title
                    lessons {
                      id
                      title
                    }
                  }
                
            }
        }`,
        variables: {
          slug: slug,
        },
      }),
    }
  );
  const data = await res.json();
  //console.log(data.data.course);
  return data.data.course
}

export default async function Course({ params }) {
  const courseData = await getCourse(params.slug);
  return (
    <div className="grid-cols-[minmax(200px,250px)_minmax(40ch,_1fr)] grid gap-4">
      
      <Navigation title={courseData.title} slug={courseData.slug} modules={courseData?.modules} lessons={courseData?.lessons} 
      />
      <main className="w-full px-5 py-10 mx-auto prose">
        <h1 className="text-3xl font-bold">{courseData.title}</h1> 
        {courseData.body && (
          <RichText  
            content={courseData?.body?.json}
            references={courseData?.body?.references}
            />
        )}
      </main>
    </div>
  );
}