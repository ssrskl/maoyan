import ClassLoaderOfJVM from "@/blogs/java/Class-Loader-Of-JVM.mdx";
import ProjectDeployment  from "@/blogs/java/Project-Deployment.mdx";

interface MdxFileConfig {
  title: string;
  path: string;
  component: any;
}

const mdxfile: MdxFileConfig[] = [{
  title: "Class-Loader-Of-JVM",
  path: "java/Class-Loader-Of-JVM.mdx",
  component: ClassLoaderOfJVM,
},
{
  title: "Project-Deployment",
  path: "java/Project-Deployment.mdx",
  component: ProjectDeployment,
}
]

export default mdxfile;