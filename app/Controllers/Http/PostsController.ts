import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';
import { StorePostValidator, UpdatePostValidator } from 'App/Validators/Post';
// import { inject } from "@adonisjs/fold";

// @inject()
export default class PostsController {

  public async index({ }: HttpContextContract) {
    const posts = await Post.query().orderBy('id', 'desc').preload('user')
    return posts;
  }



  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StorePostValidator)

    const user = await auth.authenticate()


    const post = await Post.create({ userId: user.id, ...data })

    await post.load('user')
    return post
  }



  public async show({ params }: HttpContextContract) {
    // const post = await Database.rawQuery(`select * from posts where id = ${params.id}`)
    const post = await Post.findOrFail(params.id)
    return post
  }


  public async update({ params, request }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = await request.validate(UpdatePostValidator)
    post.merge(data)
    await post.save()
    await post.load('user')
    return post
  }


  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
  }
}
