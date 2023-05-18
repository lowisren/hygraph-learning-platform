import Link from "next/link";
export default function Navigation ({title, slug, modules, lessonId}) {
    return (
    <aside className="px-1 bg-white shadow-md">
         <Link 
            className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 underline transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100 " 
            href="/">👈 Return to Main Course Menu
        </Link>

        <h1 className="px-6 py-4 text-2xl font-bold">{title}</h1>
  
        {modules &&
          modules.map((module) => (
            <div key={module.id} className="relative">
              <h2 className="px-6 py-4 text-xl font-bold">{module.title}</h2>
              <ul className="relative">
                {module.lessons &&
                  module.lessons.map((lesson) => (
                    <li key={lesson.id} className="relative">
                      <Link
                        className={`flex items-center text-sm py-4 px-6 h-12 underline overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out 
                        ${
                          lessonId === lesson.id ? "bg-gray-100" : ""
                        }`}
                        href={`/courses/${slug}/lessons/${lesson.id}`}>
                        {lesson.title} {module.isLocked ? "🔒" : ""}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </aside>
    );
}